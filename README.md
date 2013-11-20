SEMVERILY
=========

overly helpful semver version bumper


HOW TO USE:
----------
```bash
# bump build on prerelease
# (sorry you can't name prereleases: '1.2.3', 'major', 'minor', 'patch', or '-h')
   semverily alpha
   semverily rc2
   semverily my-special-name

# bump part of the version
   semverily major
   semverily minor
   semverily patch

# publish specific version
   semverily 1.2.3

# force publish specific version
   semverily 1.2.3 --force
```