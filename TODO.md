# Project name: 96 Well

## Description:
To code a SBS 96 well replica (commonly used in Molecular Biology). It will have the functionality of displaying a sample/assay/tube name by uploading a csv file containing the "Plate ID", "Well" and "Sample ID"

To facilitate cherry picking of sample/ assay/tube by providing a visual view of the location of the sample/assay/tube to be cherrypicked

### To Do ✓
- [] Split javascript object by grouped Plate ID
- [] Add in the "wells that are not pick to complete a full plate" in the split objects
- [] Create each plate and render into index.js
- [] Highlight the wells that has samples
- [] Styling of the user interface

### In Progress ...
- [] Split out the parseFile function into parseFile and groupby functions
- [] integrate groupby function into the parseFile
- [] Create function to parse through file for dynamic creation of plates using the groupby JSON => Split the JSON object into individual objects on the Plate ID Key => plateNames must be outside a function to be exported
- [] loop through the array to access the individual plates


### Completed X
- [x] File upload file select
- [x] Create a plate template to use for dynamic creation of plates
- [x] CSV file input 
- [x] Uploaded file to be read and parse
- [x] Preview only header and top 5 rows and user instructions
- [x] Convert csv into javscript object
- [x] Groupby first column name for JSON object
- [x] Create an array to hold the unique Plate ID names for looping through later
- [x] Create button to create cherry pick plates 
