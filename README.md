# Semantic Versioning

http://semver.org/

# Installation

Using command line:

1. Navigate to project's root.
2. Type command: ` $ npm i jubi_utility` 
3. Create logs folder.
4. Include the module in each script used.  `const jubi_utility= require('jubi_utility'); `

# Usage

### debug(msg, obj = null, errLevel = 1, httpCode = null)

### Important
When starting your application from command line, you must include the argument:  `DEBUG=true Example Usage:  $ DEBUG=true npm start `
#### Description
Displays pretty messages in terminal, and logs debug messages to `./logs/console.log`.
