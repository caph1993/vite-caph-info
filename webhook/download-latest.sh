#!/usr/bin/env sh

url_release_info="https://api.github.com/repos/${REPO}/releases/latest"
echo "Fetching latest release info from $url_release_info"

# For private repos, use GITHUB_TOKEN env var
if [ -n "$GITHUB_TOKEN" ]; then
  response=$(curl -L \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer ${GITHUB_TOKEN}" \
    -H "X-GitHub-Api-Version: 2022-11-28" \
    $url_release_info
)
else
  response=$(curl -L $url_release_info)
fi

# echo "Response: $response"

tag_name=$(echo "$response" | jq -r ".tag_name")
if [ "$tag_name" = "null" ]; then
  echo "No releases found for repository ${REPO}."
  exit 1
fi
if [ -z "$tag_name" ]; then
  echo "Error: Unable to fetch latest tag name from GitHub API response."
  exit 1
fi
# tarfile_url=$(echo "$response" | jq -r ".tarball_url")
tarfile_url="https://github.com/${REPO}/releases/download/${tag_name}/dist.tar.gz"

echo "Latest tag: $tag_name"

existing_tag=$(cat /app/releases/latest/version.txt 2>/dev/null || echo "")
if [ "$existing_tag" = "$tag_name" ]; then
  echo "Already at latest version: $tag_name"
  exit 0
fi
mkdir -p /app/releases/tmp/dist
curl -L -o /app/releases/tmp/dist.tar.gz "$tarfile_url" || exit 1
tar -xzvf /app/releases/tmp/dist.tar.gz -C /app/releases/tmp/dist --strip-components=1 || exit 1
echo "$tag_name" > /app/releases/tmp/dist/version.txt

if [ -d /app/releases/latest ]; then
  mv /app/releases/latest /app/releases/tmp/previous_latest
fi
mv /app/releases/tmp/dist /app/releases/latest
rm -rf /app/releases/tmp
