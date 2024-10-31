import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export function useRunResults() {
    const { consortiumId, runId } = useParams<{ consortiumId: string, runId: string }>();
    const [fileList, setFileList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [frameSrc, setFrameSrc] = useState<string | null>(null)
    const [edgeClientRunResultsUrl, setEdgeClientRunResultsUrl] = useState<string | null>(null);
    const [filesPanelWidth, setFilesPanelWidth] = useState<object>({ sm: 2, md: 1 })
    const [filesPanelShow, setFilesPanelShow] = useState<string>('inline')
    const [iframePanelWidth, setIframePanelWidth] = useState<object>({ sm: 10, md: 11 })
    const [iframeExpanded, setIframeExpanded] = useState<boolean>(false)
    const [arrowForwardShow, setArrowForwardShow] = useState<string>('none')

    useEffect(() => {
        const fetchEdgeClientRunResultsUrl = async () => {
            const { edgeClientRunResultsUrl } = await window.ElectronAPI.getConfig()
            setEdgeClientRunResultsUrl(edgeClientRunResultsUrl);
        };
        fetchEdgeClientRunResultsUrl();
    })

    interface FileResult {
        name: string;
        url: string;
    }
    
    useEffect(() => {
        if (!edgeClientRunResultsUrl) return;
        const fetchResultsFilesList = async () => {
            const accessToken = localStorage.getItem('accessToken');
            try {
                const response = await axios.get<FileResult[]>(`${edgeClientRunResultsUrl}/${consortiumId}/${runId}`, {
                    headers: {
                        'x-access-token': accessToken
                    }
                });
                const indexFile = response.data.find((file) => file.name === "index.html");
                if (indexFile && !frameSrc) {
                    const initialSrc = `${edgeClientRunResultsUrl}/${indexFile.url}?x-access-token=${accessToken}`;
                    setFrameSrc(initialSrc);
                }
                setFileList(response.data);
            } catch (err) {
                setError('Failed to fetch results');
                console.error('Error fetching results:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchResultsFilesList();
    }, [consortiumId, runId, edgeClientRunResultsUrl, frameSrc]);

    const handleHideFiles = () => {
        setFilesPanelWidth({ sm: 0 });
        setFilesPanelShow('none');
        setIframePanelWidth({ sm: 12 });
        setArrowForwardShow('inline');
        setIframeExpanded(true);
    }

    const handleShowFiles = () => {
        setFilesPanelWidth({ sm: 2, md: 1 });
        setFilesPanelShow('inline');
        setIframePanelWidth({ sm: 10, md: 11 });
        setArrowForwardShow('none'); 
        setIframeExpanded(false);        
    }
     
    return {
        consortiumId, 
        runId,
        fileList,
        loading,
        error,
        frameSrc,
        setFrameSrc,
        edgeClientRunResultsUrl,
        filesPanelWidth,
        filesPanelShow,
        iframePanelWidth,
        iframeExpanded,
        arrowForwardShow,
        handleHideFiles,
        handleShowFiles
    }
}