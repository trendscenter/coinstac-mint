import React from 'react';
import { useState } from "react";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import SaveIcon from  '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TextField from '@mui/material/TextField';

// Define custom styles
const customStyles = {
    h3 : {
        margin: '0',
        padding: '0',
        lineHeight: '2',
    },
    container: {
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '1rem',
        marginBottom: '1rem',
    },
    label: {
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'flex-start',
        alignConten: 'center',
        lineHeight: '2',
    },
    labelBetween: {
        whiteSpace: 'nowrap',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
    },
    files: {
        height: '200px',
        overflow: 'scroll',
        marginBottom: '1rem'
    }
  };

export default function OpenDialog(props: any) {

    const [directory, setDirectory] = useState(null);
    const [files, setFiles] = useState(null);
    const [editDirManually, setEditDirManually] = useState(false);

    const handleClick = (path) => {
        window.ElectronAPI.openFile().then((result) => {
            setDirectory(result.filepath);
            setFiles(result.filelist);
        });
    };

    const handleSetMount = () => {
        if(directory){
            setDirectory(null);
            setFiles(null);
            setEditDirManually(false);
            props.setMount(directory);
            props.handleSetMount();
        }
    }

    const unsetMount = () => {
        setDirectory(null);
        setFiles(null);
        props.setMount('');
        props.handleSetMount();
    }

    function filePathTrail(path){
        var parts = path.split('/').slice(-3);
        return ( parts.length == 3 ? '/' : '' ) + parts.join('/');
      }

    return(
    <div>
        {!directory && !props.mountDir && !editDirManually && 
        <div>
            <button onClick={handleClick} style={{width: '100%', borderRadius: '2rem'}}>
                Select Data Directory
            </button>
            <div style={{marginTop: '0.5rem', textAlign: 'center'}}>
                <a style={{fontSize: '0.8rem', cursor: 'pointer'}} onClick={() => setEditDirManually(!editDirManually)}>Enter Data Directory Manually</a>
            </div>
        </div>}
        {editDirManually && 
        <div style={{display: 'flex', justifyContent: 'middle', alignItems: 'center'}}>
            <TextField style={{width: '85%'}} id="standard-basic" label="Enter Directory Path" variant="standard" onChange={(e) => setDirectory(e.target.value)} />
            <SaveIcon style={{ color: 'rgba(0, 0, 0, 0.54)', marginRight: '0.25rem' }} onClick={handleSetMount} />
            <CancelIcon style={{ color: 'rgba(255, 87, 51, 0.5)' }} onClick={() => {setEditDirManually(!editDirManually)}} />
        </div>
        }
        {props.mountDir && <div style={customStyles.container}>
            <label style={customStyles.labelBetween}>
                <h3 style={customStyles.h3}>Data Directory</h3>
                <IconButton aria-label="delete" size="medium" onClick={(event) => unsetMount()}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </label>
            <div style={{fontSize: '0.9rem', marginBottom: '1rem'}}>{props.mountDir}</div>           
        </div>}
        {!props.mountDir && directory && !editDirManually && <div style={customStyles.container}>
            <label style={customStyles.labelBetween}>
                <h3 style={customStyles.h3}>Selected Directory</h3>
                <IconButton aria-label="delete" size="medium" onClick={(event) => setDirectory(null)}>
                    <DeleteIcon fontSize="inherit" />
                </IconButton>
            </label>
            <div style={{fontSize: '0.9rem', marginBottom: '1rem'}}>{directory}</div>
            {files && <div>
                <label style={customStyles.labelBetween}>
                    <h3 style={customStyles.h3}>Files</h3>
                </label>
                <label style={customStyles.label}><FolderIcon sx={{fontSize: '18px', margin: '0.4rem'}} /> &nbsp;{'...'+filePathTrail(directory)}</label>
                <FileTree files={files} />
                <button style={{width: '100%', borderRadius: '2rem', marginBottom: '1rem'}} onClick={() => handleSetMount()}>Set Mount Directory</button>
            </div>}            
        </div>}
    </div>
    )
}

function FileTree(files){
    let filesArray = files.files;
    filesArray = filesArray.slice(0, 4);
    const structure = makeTree(filesArray);
    if(structure.length > 0){
        return(
            <SimpleTreeView
                style={customStyles.files}
                slots={{
                    expandIcon: FolderIcon,
                    collapseIcon: FolderOpenIcon,
                    endIcon: TextSnippetIcon,
                }}
                sx={{paddingLeft: '0.75rem', paddingRight: '0.75rem'}}
            >
                <BuildTree nodes={structure} />
                <div style={{marginLeft: "10px", marginBottom: "10px"}}>...</div>
            </SimpleTreeView>
        )
    } 
}

function BuildTree(nodes){
    nodes = nodes.nodes;
    const list = [];
    nodes.map((node, index) => {
        node.children 
        ? list.push(<TreeItem itemId={index+'-'+node.name} label={node.name}><BuildTree nodes={node.children} /></TreeItem>)
        : list.push(<TreeItem itemId={index+'-'+node.name} label={node.name}></TreeItem>)
    });
    return list;
}

function makeTree(paths) {
    const tree = paths.reduce((parent, path) => {
        path.split('/').reduce((r, name, i, { length }) => {
            let temp = (r.children ??= []).find(q => q.name === name);
            if (!temp) r.children.push(temp = { name, ...(i + 1 === length && { isLeaf: true }) });
            return temp;
        }, parent);
        return parent;
    }, { children: [] }).children;
    return tree;
}