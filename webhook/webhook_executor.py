#!/usr/bin/env python3
from pathlib import Path
import requests
import tarfile
import shutil
import os

REPO_OWNER = os.environ["REPO_OWNER"]  # "caph1993"
REPO_NAME = os.environ["REPO_NAME"]  # "caph1993.github.io"

ddir = os.environ.get("DESTINATION_DIR", "")
if ddir:
    DESTINATION_DIR = Path(ddir).resolve()
else:
    DESTINATION_DIR = Path(__file__).resolve().parent
VERSION_FILE = DESTINATION_DIR / "dist" / "latest_version.txt"

# For private repos:
# Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
if GITHUB_TOKEN:
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
else:
    headers = {}


def get_latest_release():
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/releases/latest"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        tag_name = response.json()["tag_name"]
        tarfile_url = response.json()["tarball_url"]
        tarfile_url = f"https://github.com/{REPO_OWNER}/{REPO_NAME}/releases/download/{tag_name}/dist.tar.gz"
        return tag_name, tarfile_url
    else:
        raise Exception(f"Failed to fetch release: {response.status_code}")


def get_installed_version():
    if VERSION_FILE.exists():
        return VERSION_FILE.read_text().strip()
    return None


def download_and_extract(url, version):
    tgt_dir = DESTINATION_DIR / "dist"
    tmp_dir = DESTINATION_DIR / "tmp"
    try:
        tmp_dir.mkdir(exist_ok=True)
        archive_path = tmp_dir / f"incoming-dist.tar.gz"

        # Download
        response = requests.get(url, stream=True, headers=headers)
        if response.status_code == 200:
            with archive_path.open("wb") as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
        else:
            raise Exception(f"Failed to download: {response.status_code}")

        # Extract
        with tarfile.open(archive_path, "r:gz") as tar:
            tar.extractall(path=tmp_dir)

        archive_path.unlink()

        incoming = tmp_dir / "dist"

        if tgt_dir.exists():
            shutil.rmtree(tgt_dir)
        incoming.rename(tgt_dir)
    finally:
        shutil.rmtree(tmp_dir)

    # Save new version
    VERSION_FILE.write_text(version)

    print(f"Updated to version {version}")


def main():
    try:
        latest_version, download_url = get_latest_release()
        installed_version = get_installed_version()

        if latest_version != installed_version:
            print(f"New version found: {latest_version}. Downloading...")
            download_and_extract(download_url, latest_version)
        else:
            print("Already up to date.")

    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
