import { useState } from "react";
import axios from "axios";

export const CodeEvoForm=()=>{   


        const [title,setTitle]=useState('');
        const [userId,setUserId]=useState();
        const [body,setBody]=useState();

        const onTitle=(e)=>{
            setTitle(e.target.value);
        }
        const onUserId=(e)=>{
            setUserId(e.target.value);
        }
        const onBody=(e)=>{
            setBody(e.target.value);
        }
        const [data,setdata]=useState('');
        const submit=(event)=>{
            event.preventDefault();
            // const url='https://localhost:7087/api/Form';
            // const data={
            //     "title": title,
            //      "body": body,
            //     "userId":userId,
            // }

            axios.get("https://localhost:7087/api/Form")
            .then((res)=>console.log("succss",res))
            .catch((err)=>{
                console.log("err 6cc4rs");
                    
                console.log(err);
            })

            console.log(data);
        }
        const submitusingFetch=(event)=>{
            event.preventDefault();

            fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          body: body,
          userId:userId,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json,"sd"));
        }
    return(
    <div>
        <form onSubmit={submit}>
            Title:<input type="text" value={title} onChange={onTitle}></input>
            userId:<input type="text" value={userId} onChange={onUserId}></input>
            body:<input type="text" value={body} onChange={onBody}></input>
            <button type="submit">Submit</button>
        </form>
    </div>
    )
}
