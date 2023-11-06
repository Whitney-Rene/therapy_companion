import { useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import functions from '../../utils/functions';

export default function EntryForm() {

    //initialize variables
    const { entry_type } = useParams();
    const navigateTo = useNavigate();
    const [quote, setQuote] = useState("");
    const [confirmationMessage, setConfirmationMessage] = useState("");

    const userEntryType = useRef(entry_type);
    const userEntryDate = useRef(null);
    const userEntryContent = useRef(null);

    //this function is triggered, when a user submits a r/b/th
    //async function, in try/catch block (to handle success/failure of async call)
    const handleSubmit = async (event) => {
        //this prevents the default behavior of an event, so the default action of a form is to submit the data and reload the page
        event.preventDefault();

        const entryData = {
            entry_type: userEntryType.current,
            entry_date: userEntryDate.current?.value,
            entry_content: userEntryContent.current?.value,
        }
        
        //try/catch blocks are used to handle asynchronous functionss that involve api calls
        try {
            await functions.postRequest("/add-entries/1", entryData);
            console.log("Form data:", entryData);
            //resets input fields to blank
            userEntryDate.current.value = null;
            userEntryContent.current.value = null;

            setConfirmationMessage("Entry submitted")

            const data = await functions.getRequest("/quotes");
            setQuote(data);

        } catch (error) {
            console.error("Error submitting form data:", error);
            setConfirmationMessage("There was an issue submitting your entry");
            setQuote("");
        }

    };

    const routeHome = () => {
        navigateTo("/");
    }

    //FUTURE PLANS
    //update ListLatestEntries Component? *not necssary because this is happening on another page
    //upon submit: *need to decide
        //then take user back to main page 
            //useNavigate commented out on line 7
            //navigateTo("/"); in try of postRequest call
            //const navigateTo = useNavigate();
        //OR
        //if user wants to add another entry on the same page, clear conf message and quote, upon change/type in input box
            //info bar at top with inspirational quote


    return (
        <>
        <h2>create a {entry_type} entry</h2>

        <form onSubmit={handleSubmit}>

            <label>
                Date:
                <input required type='date' ref={userEntryDate}></input>
            </label>
            <label>
                {entry_type}
                <textarea required ref={userEntryContent} />
            </label>
            <button type='submit'>Submit</button>
    

        </form>

        <button onClick={routeHome}>Cancel</button>

        {confirmationMessage}

        {/* conditional rendering statement:
        if the quote has a truthy value = not empty/null/underfined, {quote} will render true
        && logical && operator, will conditionally render the second operand `quote` if the first operand {quote} is true
        after logical operator is what will be displayed if `quote` is truthy */}
        {quote && quote.affirmation}
            
        </>
    )
}