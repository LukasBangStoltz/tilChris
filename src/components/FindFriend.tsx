/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

interface IFriendResult{
  findOne: ILyndaFriend
}

interface IVariableInput{
  input: String
}

const GET_FRIEND = gql`
 query findOne($input:String){
  findOne(input: $input)
  {id
  email
  age
  firstName
  lastName
  gender}
}
`

export default function FindFriend() {
  const [input, setInput] = useState("")
  const [getFriend, {loading, called, error, data}] = useLazyQuery<IFriendResult, IVariableInput>(
    GET_FRIEND,
    {fetchPolicy: "cache-and-network"}
  );

  const fetchFriend = () => {
    getFriend({variables: {input}})
  }

  return (
    <div>
      Email:<input type="txt" value={input} onChange={e => {
        setInput(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />
      {called && loading && <p>loading....</p>}
      {data && <p>{data.findOne.firstName}</p>}
      <h2>Fetch a friend using the provided Email</h2>

    </div>)
}
