@echo off
REM This script drives the standalone dart-sass package, which bundles together a
REM Dart executable and a snapshot of dart-sass.

set chemin=%~dp0
cd %chemin%
REM echo %chemin%
cd ..

dart-sass\sass assets/CSS:assets/CSS --watch