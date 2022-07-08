import React, { useState } from "react";
import Modal from "react-modal";
import { Link, PaperPlaneTilt, TextT, X } from "phosphor-react";
import { v4 as uuid } from "uuid";
import styles from "./NewPostModal.module.css";
import { api } from "../../services/api";

interface NewPostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface Content {
  id: string;
  type: "paragraph" | "link";
  value: string;
  isEditing: boolean;
}

export function NewPostModal({ isOpen, onRequestClose }: NewPostModalProps) {
  const [content, setContent] = useState<Content[]>([]);

  const isPublishButtonHaveContent = content.length === 0;

  function handleAddText() {
    const newContent: Content = {
      id: uuid(),
      type: "paragraph",
      value: "",
      isEditing: false,
    };

    setContent((content) => {
      return [...content, newContent];
    });
  }

  function handleEditValue(id: string, value: string) {
    const newContent = content.map((item) => {
      if (item.id === id) {
        return { ...item, value };
      }

      return item;
    });

    setContent(newContent);
  }

  function handleSetEditing(id: string, isEditing: boolean) {
    const newContent = content.map((item) => {
      if (item.id === id) {
        return { ...item, isEditing };
      }

      return item;
    });

    setContent(newContent);
  }

  async function handleSubmit() {
    const res = await api.post("/posts", {
      content,
    });

    console.log(res.data);
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Example Modal"
        className={styles.modalContainer}
        overlayClassName={styles.modalOverlay}
      >
        <header>
          <h2>Nova publicação</h2>
          <button className={styles.closeButton} onClick={onRequestClose}>
            <X size={18} />
          </button>
        </header>

        <div className={styles.content}>
          <div className={styles.contentButtons}>
            <div className={styles.contentType}>
              <button type="button" onClick={handleAddText}>
                <TextT />
                Texto
              </button>
              <button type="button">
                <Link />
                Link
              </button>
            </div>

            <button onClick={handleSubmit} disabled={isPublishButtonHaveContent}>
              <PaperPlaneTilt />
              Publicar
            </button>
          </div>
          {content.length === 0 ? (
            <p>Adicione um tipo de conteúdo clicando nos botões acima...</p>
          ) : (
            <ul>
              {content.map((item) =>
                item.isEditing ? (
                  <React.Fragment key={item.id}>
                    <input
                      type="text"
                      value={item.value}
                      onChange={(e) => handleEditValue(item.id, e.target.value)}
                    />
                    <button
                      onClick={() => handleSetEditing(item.id, !item.isEditing)}
                    >
                      Concluir alteração
                    </button>
                  </React.Fragment>
                ) : (
                  <li
                    key={item.id}
                    onClick={() => handleSetEditing(item.id, !item.isEditing)}
                  >
                    {Boolean(item.value)
                      ? item.value
                      : "Clique aqui para editar o conteúdo..."}
                  </li>
                )
              )}
            </ul>
          )}
          json
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      </Modal>
    </div>
  );
}
