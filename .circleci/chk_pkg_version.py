"""Compare the version in current package.json with the one in master
branch to ensure that it has been updated.
"""

import json, sys

master_filename = "/tmp/package.json"
current_filename = "/home/circleci/adage-frontend/package.json"

with open(master_filename) as mf, open(current_filename) as cf:
    master_version = json.load(mf)['version']
    current_version = json.load(cf)['version']

master_tokens = [int(x) for x in master_version.split('.')]
current_tokens = [int(x) for x in current_version.split('.')]
length = min(len(master_tokens), len(current_tokens))

version_updated = None
for i in range(length):
    if current_tokens[i] > master_tokens[i]:
        version_updated = True
        break
    if current_tokens[i] < master_tokens[i]:
        version_updated = False
        break

# "x.y" to "x.y.z" is an update too
if version_updated is None:
    version_updated = len(current_tokens) > len(master_tokens)

if version_updated:
    print("Version check passed")
else:
    print("Version check in package.json failed: %s --> %s" %
          (master_version, current_version)
    )
    sys.exit(1)
