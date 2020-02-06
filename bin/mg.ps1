
Set-Variable MG_STRING 'try-cli\": \"${thisCommand}\"' -Option AllScope
Set-Variable INPUT_FILE 'package.json' -Option AllScope

node .\script\cli.js