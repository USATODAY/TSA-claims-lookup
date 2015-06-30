#tsa

tsa lookup


Copyright 2015 USA TODAY. All rights reserved. No part of these materials may be reproduced, modified, stored in a retrieval system, or retransmitted, in any form or by any means, electronic, mechanical or otherwise, without prior written permission from USA TODAY.

##Development

The requirements for this project are Node.js, Bower and Grunt. 

To install node with Hombrew:
`brew install node`

Or head over to the [Node website](http://nodejs.org/) and install from there.
Once Node is installed, install Grunt with
`npm install -g grunt-cli`

and install Bower with 
`npm install -g bower`

Once those dependencies are set up, from this repository run `npm install`, then run `grunt`

###Updating Data
Set up a Python Virtual environment, install dependencies with `pip install -r requirements.txt`

Stick new spreadsheet data into the `data_tools/input` folder and name `data.xlsx`

To create new JSON file, run
```
python data_tools/read_file.py
```

Your formated JSON is now in the `data_tools/output` folder.
