# TheVirtualCloset
Development of The Virtual Closet

## Development Cycle
When creating a feature, your development life-cycle should look something like this:

1) Create a new local branch from origin/master.

![Git](https://puu.sh/uEAvQ/2ab37f507f.png)
![Git](https://puu.sh/uEBaj/34360d2e8b.png)
![Git](https://puu.sh/uEBf1/9e2ca87995.png)

2) Name the branch as something relevant to the feature that you will be working on.

![Git](https://puu.sh/uEBnD/8859709c02.png)

3) Create your changes.
4) Before committing, pull from master to ensure that your branch is up-to-date and resolve any merge conflicts.

![Git](https://puu.sh/uEBI7/f54e13cc68.png)

5) Commit your changes. Double-check the diff to make sure there is nothing excess being committed and there are no obvious bugs. Make sure to add a helpful commit message as well. Select 'Commit and Push...' to immediately push your changes to GitHub.

![Git](https://puu.sh/uECtL/a8b1f18aeb.png)

![Git](https://puu.sh/uECju/ed2859b0b2.png)

6) Create a 'Pull Request' on GitHub.

7) Wait for your change to be approved to be merged into master. This can be done by yourself, but having someone else within your team do it lets us perform a small code review that can catch errors you may have missed.
  * If you are working on another feature while you wait, repeat steps 1-6.

8) Once your change is approved, delete your branch and repeat. This ensures that your branch is up to date with master and that broken features are not submitted to master.

## F.A.Q.
### 1) I accidentally made changes to master! How do I fix without removing all my changes?!
* Create a new branch (See: step 1).
* Copy and paste the changes made in master to this new branch.
* Checkout master again. Run *git reset --hard* in the terminal. This will reset the master branch to it's last commit.
* All done!

### 2) I'm seeing "warning: LF will be replaced by CRLF in [path]" when I try to commit or add files. What does this mean?
This stems from the way that Unix-based systems and Windows-based systems represent new lines. Unix will represent a new line as a "line feed" (CR), whereas Windows represents new lines as a "carriage return" (CR) and a "line feed" (LF). If you'd like to disable this message, just run *git config --global core.safecrlf false* within your console. This will disable the warnings, but not the conversion that git provides.
