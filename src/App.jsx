import "./styles.css";
import Output from "./components/Output";
import { PlusOutlined , LoadingOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { addNotes } from "../src/app/features/noteSlice";
import { useDispatch } from "react-redux";



export default function App() {
  const dispatch = useDispatch();
  const [isLoading,setLoading] = useState(false) 
  const [open, setOpen] = useState(false);
  const editor = useRef(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function submitNote(event) {

    event.preventDefault();
      setLoading(true)

    setTimeout(() => {
      const dataSet = {
        title: title,
        content: content,
        id: Math.floor(Math.random() * 8999999 + 1000000)
      };
          
      dispatch(addNotes(dataSet));
      setOpen(false);
      setTitle("");
      setContent("");
      setLoading(false);      // Set loading to false after dispatching
    }, 500)
  }

  return (
    <div className="App">
      <h1>Notes</h1>
      <button
        onClick={() => setOpen(true)}
        style={{
          width: "12rem",
          height: "2rem",
          border: "none",
          cursor: "pointer",
          borderRadius: "1rem",
          marginTop: "1rem",
          backgroundColor: "#426eff",
          color: "white",
          padding: "1rem",
          paddingBottom: "2rem",
        }}
      >
        <PlusOutlined /> Create New Note
      </button>
      <Modal
      
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1200}
        footer={null}
        height={600}
      >
        <form>
          <h4>Enter Title</h4>
          <input placeholder="Enter Title" 
            type="text"
            required
            style={{
              width: "95%",
              padding: "1rem",
              outline: "none",
              fontSize: "20px",
              border: "none",
            }}
            ref={editor}
            value={title}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => setTitle(newContent.target.value)}
          />
          <h1>Enter Note!</h1>
          <JoditEditor
              required
            ref={editor}
            value={content}
            tabIndex={1} // tabIndex of textarea
            onBlur={(newContent) => setContent(newContent)}
          />
              <div className="cb" style={{display:'flex'}}>
              <Button
              type="primary" htmlType= "submit"
              style={{ marginTop: "1rem" }}
              onClick={submitNote}
            >
              Add
            </Button>
            <h2 style={{paddingLeft:'3rem'}}>{isLoading ? <LoadingOutlined />:" "}</h2>
            </div>
         
         
        </form>
      </Modal>
      <Output/>
    </div>
  );
}
