import React from 'react';
import ApiContext from '../ApiContext';


export default class AddFolder extends React.Component {
    state = {
        folderName: { value: '' },
        touched: false
    };
    
    static defaultProps = {
        folders: [],
        notes: [],
        match: {
            params: {}
          }
    };

    static contextType = ApiContext;

    setNewFolderName = name => {
        this.setState({folderName: {value: name}, touched: true});
    }

    validateFolderName () {
        let folderName = this.state.folderName.value;
        if (this.context.folders.filter(folder => folder.name === folderName).length > 0)
            return 'Must be a unique Folder name';
    }

    handleCreateFolder = e => {
        e.preventDefault();
        const newFolder = this.state.folderName.value
        const newFolderJson = JSON.stringify({ name: newFolder });

        fetch(`http://localhost:9090/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: newFolderJson
        }).then(res => {
            if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            return res.json()
        }).then(() => {
            this.context.addFolder(newFolder);
            console.log(this.context.folders);
            //return user to home page
            //this.props.history.push(`/folder/${this.context.folders}`);
        }).catch(error => {
            console.error({ error });
        })
    }

    render() {
        const { name, id } = this.props.folders
        return (
            <div>
                <label htmlFor="new-folder">
                    New Folder Name:       
                </label>
                <input id="new-folder" type="text" value={this.state.folderName.value}
                    onChange={e => this.setNewFolderName(e.target.value)} />
                    <p className="error">{this.validateFolderName()}</p>
                <button disabled={this.validateFolderName()} onClick={this.handleCreateFolder}>Create Folder</button>
            </div>
        );
    }
} 