from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]

PAGES = [
    ROOT / 'index.html',
    ROOT / 'products' / 'index.html',
    ROOT / 'products' / 'ms-1-1' / 'index.html',
    ROOT / 'documentation' / 'index.html',
    ROOT / 'about' / 'index.html',
    ROOT / 'contact' / 'index.html',
]


def test_required_pages_exist():
    missing = [str(p.relative_to(ROOT)) for p in PAGES if not p.exists()]
    assert not missing, f'Missing pages: {missing}'


def test_brand_and_product_copy_present():
    all_text = '\n'.join(p.read_text(encoding='utf-8') for p in PAGES)
    assert 'DemQora Technologies' in all_text
    assert 'Advanced Market Intelligence' in all_text
    assert 'MS 1.1' in all_text
    assert 'Coming Soon on MQL5 Market' in all_text


def test_no_direct_checkout_language():
    all_text = '\n'.join(p.read_text(encoding='utf-8').lower() for p in PAGES)
    forbidden = ['checkout', 'add to cart', 'pay now']
    assert all(term not in all_text for term in forbidden)


def test_no_unwanted_market_structure_labels_in_decorative_copy():
    all_text = '\n'.join(p.read_text(encoding='utf-8') for p in PAGES)
    for label in ['CHOCH', '>HH<', '>HL<']:
        assert label not in all_text


def test_shared_assets_exist():
    expected = [
        ROOT / 'assets' / 'css' / 'styles.css',
        ROOT / 'assets' / 'js' / 'main.js',
        ROOT / 'assets' / 'img' / 'demqora-logo.png',
        ROOT / 'assets' / 'img' / 'hero-banner.png',
        ROOT / 'assets' / 'img' / 'ms11-control-panel.png',
    ]
    missing = [str(p.relative_to(ROOT)) for p in expected if not p.exists()]
    assert not missing, f'Missing assets: {missing}'


def test_each_page_has_meta_viewport_and_title():
    for page in PAGES:
        html = page.read_text(encoding='utf-8')
        assert 'name="viewport"' in html, page
        assert re.search(r'<title>[^<]+</title>', html), page
