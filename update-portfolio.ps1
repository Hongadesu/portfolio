git checkout --orphan temp
git add .
git commit -m "Update portfolio"
git branch -D main
git branch -m main
git push -f origin main