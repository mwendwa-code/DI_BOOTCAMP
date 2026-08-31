import time

import requests # type: ignore


def get_page_load_time(url, timeout=15):
    """Return the time in seconds needed for a complete response."""
    start_time = time.perf_counter()
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    end_time = time.perf_counter()
    return end_time - start_time


if __name__ == "__main__":
    websites = {
        "Google": "https://www.google.com",
        "Ynet": "https://www.ynet.co.il",
        "IMDb": "https://www.imdb.com",
    }

    for name, url in websites.items():
        try:
            load_time = get_page_load_time(url)
            print(f"{name} loaded in {load_time:.2f} seconds")
        except requests.RequestException as error:
            print(f"Could not load {name}: {error}")
