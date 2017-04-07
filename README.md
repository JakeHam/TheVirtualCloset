# TheVirtualCloset
Development of The Virtual Closet

## Development Cycle
For the development of The Virtual Closet, we will be following the "Feature Branch Workflow" for Git integration. Feel free to read more about it [here](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow). Since we're all using IntelliJ for development, I've created a helpful guide (with pictures!) in case you get lost.

1) Make sure that you are on your local master and that it is up to date.

![Git](https://puu.sh/uEAvQ/2ab37f507f.png)

2) Create a new branch from your local master.

![Git](http://puu.sh/uJtBY/3045a1f985.png)

3) Name the branch as something relevant to the feature that you will be working on.

![Git](http://puu.sh/uJtJH/bc3fe5ca98.jpg)

4) Create your changes.

5) Before committing, pull from master to ensure that your branch is up-to-date and resolve any merge conflicts.

![Git](https://puu.sh/uEBI7/f54e13cc68.png)

6) Commit your changes. Make sure to add a helpful commit message. Under the 'Commit' dropdown, select 'Commit and Push...' to immediately push your changes to GitHub.

![Git](https://puu.sh/uECtL/a8b1f18aeb.png)

![Git](http://puu.sh/uJtWV/fe440b1918.png)

7) Select 'Compare & pull request' on GitHub.

![Git](http://puu.sh/uJu4q/aa117d25e3.png)

8) Select a member of your team to review your code.
 * You may add additional comments to further explain your code, but it is not necessary.

![Git](http://puu.sh/uJuq8/7f217723d7.png)

9) Wait for your change to be approved to be merged into master. This can be done by yourself, but having someone else within your team do it lets us perform a code review to catch obvious errors that you may have missed.
  * If you are working on another feature while you wait, repeat steps 1-8.
  * If you are the code reviewer, scan over the pull request's diff. If everything looks good, merge the pull request.

![Git](http://puu.sh/uJuBk/ec9b356be4.png)

10) Once your change is approved, delete your branch and repeat. This ensures that your branch is up to date with master and that broken features are not submitted to master.

## F.A.Q.
### 1) I accidentally made changes to master! How do I fix without removing all my changes?!
* ~~Create a new branch (See: step 2).~~
* ~~Copy and paste the changes made in master to this new branch.~~
* Create a new branch with *git checkout -b ${NewBranchName}*
* Checkout master again. Run *git reset --hard* in the terminal. This will reset the master branch to it's last commit.
* All done!

### 2) I'm seeing "warning: LF will be replaced by CRLF in [path]" when I try to commit or add files. What does this mean?
This stems from the way that Unix-based systems and Windows-based systems represent new lines. Unix will represent a new line as a "line feed" (CR), whereas Windows represents new lines as a "carriage return" (CR) and a "line feed" (LF). If you'd like to disable this message, just run *git config --global core.safecrlf false* within your console. This will disable the warnings, but not the conversion that git provides.
