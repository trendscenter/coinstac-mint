import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import ReactMarkdown from 'react-markdown';

export default function ComputationPanel({
    panelConsortiumDetails, 
    panelComputations, 
    panelSelectComputation, 
    panelSetSelectComputation, 
    panelSelectableComputation,
    panelSetSelectableComputation, 
    panelHandleSetComputation,
    panelUserIsLeader
}) {
    return (
        <div>
            {panelConsortiumDetails.studyConfiguration.computation && 
            <div>
                <small>Computation:</small>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    <h2 style={{color: '#000000', marginBottom: '0', marginRight: '0.5rem'}}>
                        {panelConsortiumDetails.studyConfiguration.computation.title}
                    </h2>
                    {panelUserIsLeader && <div>
                    {!panelSelectComputation ? 
                    <EditIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} onClick={() => {panelSetSelectComputation(!panelSelectComputation)}} /> :
                    <CancelIcon style={{ color: 'rgba(0, 0, 0, 0.54)' }} onClick={() => {panelSetSelectComputation(!panelSelectComputation)}} />}
                    </div>}
                </div>
            </div>}
            {panelSelectComputation && <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem', justifyContent: 'flex-start'}}>
            <select
                value={panelSelectableComputation}
                onChange={(e) => panelSetSelectableComputation(e.target.value)}
                style={{marginRight: '1rem', height: '2.5rem', width: 'auto'}}
            >
                <option value="" disabled>Select Computation</option>
                {panelComputations && panelComputations.map((comp: any) => (
                    <option key={comp.id} value={comp.id}>
                        {comp.title}
                    </option>
                ))}
            </select>
            <button style={{height: '2.5rem'}} onClick={panelHandleSetComputation}>Set</button>
            </div>}
            {panelConsortiumDetails.studyConfiguration.computation && panelConsortiumDetails.studyConfiguration.computation.notes && <div><ReactMarkdown children={panelConsortiumDetails.studyConfiguration.computation.notes} /></div>}
        </div>)
}