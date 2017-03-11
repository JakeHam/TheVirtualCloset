# TheVirtualCloset
Development of The Virtual Closet

## F.A.Q.
###### 1) I'm seeing "warning: LF will be replaced by CRLF in [path]" when I try to commit or add files. What does this mean?
This stems from the way that Unix-based systems and Windows-based systems represent new lines. Unix will represent a new line as a "line feed" (CR), whereas Windows represents new lines as a "carriage return" (CR) and a "line feed" (LF). If you'd like to disable this message, just run **git config --global core.safecrlf false** within your console. This will disable the warnings, but not the conversion that git provides.
