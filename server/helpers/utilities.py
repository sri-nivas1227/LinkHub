import re
def convert_to_slug(text: str) -> str:
    text = text.strip().lower()
    text = re.sub(r'\s+', '-', text)
    text = re.sub(r'[^\w\-]+', '', text)
    return text

convert_to_slug("Hello World! This is,:) a test.")