import Computation from "../../ConsortiumDetails/Computation/Computation";
import { useConsortiumDetailsContext } from "../../ConsortiumDetails/ConsortiumDetailsContext";

export default function StepSelectComputation() {
    const {data: consortiumDetails} = useConsortiumDetailsContext();
    const selectedComputation = consortiumDetails?.studyConfiguration?.computation;

    return <div>
                    <Computation computation={selectedComputation}></Computation>
    </div>
}