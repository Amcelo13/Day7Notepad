import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getSearch } from "../utils/getSearch";
import "./Box.scss";
import JoditEditor from "jodit-react";
import { useEffect, useRef } from "react";
import "./Navbar.scss";
import { useState } from "react";
import { addNotes, deleteNotes, update } from "../app/features/noteSlice";
import { Button, Modal } from "antd";

function Output() {
  const dispatch = useDispatch();
  const node = useSelector((state) => state.notes.node);
  const [searchValue, setSearchValue] = useState("");
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [value, setValue] = useState("");

  //Search logic
  const [data, setData] = useState(node);

  useEffect(() => {
    if (isSearchEnabled) {
      const filteredData = getSearch(node, searchValue);
      setData(filteredData);
      console.log(filteredData);
    } else {
      setData(getSearch(node, searchValue));
    }
  }, [isSearchEnabled, node, searchValue]);

  //edit log
  const [open, setOpen] = useState(false);
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [id, setid] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchValue(value);
    setIsSearchEnabled(true);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "") {
      setIsSearchEnabled(false);
    }
    setSearchValue(value);
    setIsSearchEnabled(true);
  };
  const handleDelete = (id) => {
    dispatch(deleteNotes(id));
  };
  const handleEdit = (value) => {
    // seteditdata(value);
    setOpen(true);
    setTitle(value.title);
    setContent(value.content);
    setid(value.id);
  };
  const handlesave = (data) => {
    dispatch(update(data));
  };

  return (
    <>
      <div className="top">
        <div className="navbar">
          <h1 style={{ paddingTop: "2rem" }}> Your Notes </h1>
        </div>

        <div className="products">
          <form action="" onSubmit={handleSubmit}>
            <input
              type="text"
              value={value}
              placeholder="Search for products"
              id="inp"
              onChange={handleChange}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="boxes" style={{ paddingTop: "4rem" }}>
        {data?.map((e) => {
          return (
            <div key={e.id}>
              <div className="box" style={{ color: "black" }}>
                <h2 style={{ paddingTop: "2rem" }}>{e.title}</h2> <br />
                <div
                  className="hash"
                  style={{ color: "#fff" }}
                  dangerouslySetInnerHTML={{ __html: e.content }}
                ></div>
                <div
                  className="editdelete"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: "12rem",
                    paddingRight: "1rem",
                  }}
                >
                  <p
                    style={{ color: "black", fontSize: "2rem" }}
                    onClick={() => handleEdit(e)}
                  >
                    <EditOutlined />
                  </p>

                  <Modal
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    width={800}
                    footer={null}
                    height={600}
                  >
                    <form>
                      <h4>Enter Title</h4>
                      <input
                        type="text"
                        style={{
                          width: "95%",
                          padding: "1rem",
                          outline: "none",
                          fontSize: "20px",
                        }}
                        ref={editor}
                        value={title || ""}
                        tabIndex={1} // tabIndex of textarea
                        onChange={(
                          newContent //Editing the previous content here
                        ) => setTitle(newContent.target.value)}
                      />
                      <h1>Enter Note!</h1>
                      <JoditEditor
                        ref={editor}
                        value={content || ""}
                        tabIndex={1} // tabIndex of textarea
                        onBlur={(newContent) => setContent(newContent)}
                      />

                      <Button
                        type="primary"
                        style={{ marginTop: "1rem" }}
                        onClick={() =>
                          handlesave({
                            title: title,
                            content: content,
                            id: id,
                          })
                        }
                      >
                        Save
                      </Button>
                    </form>
                  </Modal>
                  <p
                    style={{ color: "red", fontSize: "2rem" }}
                    onClick={() => handleDelete(e.title)}
                  >
                    <DeleteOutlined />
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Output;



