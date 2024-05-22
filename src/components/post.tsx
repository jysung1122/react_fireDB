import styled from "styled-components";
import { IPost } from "./Timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import React, { useState } from "react";
import { FirebaseError } from "firebase/app";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;
const Column = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
  margin: 0 auto;
`;
const Username = styled.span`
  font-weight: bold;
  font-size: 15px;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;
const Input = styled.input`
  margin: 10px 0px;
  font-size: 18px;
  width: 200px;
  background-color: #43aa8b;
  color: white;
  border: 1px solid #43aa8b;
  border-radius: 15px;
`;

interface IButton {
  $isRed?: boolean;
}

const Button = styled.button<IButton>`
  background-color: ${(props) => (props.$isRed ? "tomato" : "#0984e3")};
  color: white;
  font-weight: bold;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
  width: fit-content;
`;
const EditPhoto = styled.label`
  padding: 5px 10px;
  color: white;
  background-color: #636e72;
  font-size: 14px;
  cursor: pointer;
  width: fit-content;
  margin: auto;
  border-radius: 5px;
`;
const File = styled.input`
  display: none;
`;

const Post = ({ username, photo, post, userId, id }: IPost) => {
  const user = auth.currentUser;
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(post);
  const [isLoading, setLoading] = useState(false);
  const [lastValue, setLastValue] = useState(post);
  const [file, setFile] = useState<File | null>(null);

  const onDelete = async () => {
    const ok = confirm("Are you sure you want to delete this post?");
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, "posts", id));
      if (photo) {
        const photoRef = ref(storage, `posts/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onEdit = async () => {
    setEditMode(true);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  const onSave = async () => {
    if (isLoading || user?.uid !== userId) return;
    try {
      setLoading(true);
      await updateDoc(doc(db, `posts/${id}`), { post: editValue });
      if (file) {
        const locationRef = ref(storage, `posts/${user.uid}/${id}`);
        deleteObject(locationRef).catch((e: FirebaseError) => {
          if (e.code === "storage/object-not-found") {
            return;
          } else {
            console.error(e);
          }
        });

        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc(db, `posts/${id}`), { photo: url });
        setFile(null);
      }

      await setLastValue(editValue);
      setEditMode(false);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setEditValue(lastValue);
    setEditMode(false);
  };

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        {editMode ? (
          <Input
            name="post"
            value={editValue}
            onChange={onChange}
            placeholder="Enter the post to update."
          />
        ) : (
          <Payload>{post}</Payload>
        )}
        {user?.uid === userId ? (
          <div>
            <Button $isRed={true} onClick={editMode ? onCancel : onDelete}>
              {editMode ? "Cancel" : "Delete"}
            </Button>
            {!editMode ? (
              <Button onClick={onEdit} disabled={isLoading}>
                Update
              </Button>
            ) : (
              <Button onClick={onSave}>
                {isLoading ? "Saving.." : "Save"}
              </Button>
            )}
          </div>
        ) : null}
      </Column>
      <Column>
        {editMode ? (
          <>
            <EditPhoto htmlFor="editPhoto">
              {file ? "Edited Photo ✅" : "Edit Photo"}
            </EditPhoto>
            <File
              type="file"
              accept="image/*"
              id="editPhoto"
              onChange={onChangePhoto}
            />
          </>
        ) : photo ? (
          <Photo src={photo} />
        ) : null}
      </Column>
    </Wrapper>
  );
};

export default Post;
