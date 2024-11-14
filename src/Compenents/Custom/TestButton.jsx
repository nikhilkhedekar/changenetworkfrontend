import { useCallback, useEffect, useState } from "react";
import { api } from "../../api/api";

const TestButton = ({ testID, completeTest, testType }) => {

    const [testData, setTestData] = useState(null);

    const getUserTest = useCallback(async () => {
        const { data } = await api.post("/userTest/isTestCompleted", {
            testID
        });
        console.log("getUserTest", data);
        setTestData(data);
    }, []);

    useEffect(() => {
        getUserTest();
    }, []);

    return (
        <>
            {

                testData?.payload == null || testData?.payload?.length == 0 ? <button onClick={() => completeTest(testID, testType)} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" >
                    <span  >Incomplete</span>
                </button> : <>
                    <button disabled className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" >
                        <span>Completed</span>
                    </button>
                </>

            }

        </>
    )
}

export default TestButton;