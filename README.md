# simple-puppeteer

Simple command line to crawl specific parts of a page using puppeteer

## Usage

```
# extracts all title attributes 
node index.js --url __URL__ --output file.txt --selector "[title]" --property getAttribute --propertyKey title

# extracts all text content of paragraphs
node index.js --url __URL__ --output file.txt --selector p

# extracts all html content of paragraphs
node index.js --url __URL__ --output file.txt --selector p --property html
node index.js --url __URL__ --output file.txt --selector p --property innerHTML 

```