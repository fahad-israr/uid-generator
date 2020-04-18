import React from 'react';
import Papa from  'papaparse'
class FileReader extends React.Component {
    constructor() {
      super();
      this.state = {
        csvfile: undefined,
        student_data:null
      };
      this.updateData = this.updateData.bind(this);
    }
  
    handleChange = event => {
      this.setState({
        csvfile: event.target.files[0]
      });
    };
  
    importCSV = () => {
      const { csvfile } = this.state;
      Papa.parse(csvfile, {
        complete: this.updateData,
        header: true
      });
    };
  
    updateData(result) {
      var data = result.data;
      this.setState({student_data:data})
      console.log(data);
    }
  
    render() {
      console.log(this.state.csvfile);
      return (
        <div className="App">
          <h2>Generate Student Email Id @iiitt.ac.in</h2>
          <h3>Upload the Csv File !</h3>
          <input
            className="csv-input"
            type="file"
            ref={input => {
              this.filesInput = input;
            }}
            name="file"
            placeholder={null}
            onChange={this.handleChange}
          />
          <p />
          <button onClick={this.importCSV}> Upload now!</button>

          {this.state.student_data &&<div>
            <table>
                <tr>
                    <th>Sr.No.</th>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Generated Email</th>
                </tr>
                {this.state.student_data.map((student)=>{
                    if(student["Email address"])return(
                        <tr>
                            <td>{student["Sl No."]}</td>
                            <td>{student["Roll No"]}</td>
                            <td>{student["Name"]}</td>
                            <td>{student["Email address"].substring(0,student["Email address"].indexOf("@"))+"@iiitt.ac.in"}</td>
                        </tr>

                    )
                })}
            </table>

          </div> }
        </div>
      );
    }
  }
  
  export default FileReader;