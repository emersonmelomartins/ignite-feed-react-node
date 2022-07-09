import React, { useState } from "react";
import Modal from "react-modal";
import { Link, PaperPlaneTilt, TextT, Trash, X } from "phosphor-react";
import { v4 as uuid } from "uuid";
import styles from "./NewPostModal.module.css";
import { api } from "../../services/api";
import { toast } from "react-toastify";

interface NewPostModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

interface Content {
  id: string;
  type: "paragraph" | "link";
  value: string;
  isEditing: boolean;
  order: number;
}

export function NewPostModal({ isOpen, onRequestClose }: NewPostModalProps) {
  const [content, setContent] = useState<Content[]>([]);

  const isPublishButtonHaveContent = content.length === 0;

  function handleAddText() {
    let order = 0;

    if (content.length > 0) {
      content.forEach((item) => {
        if (item.order >= order) {
          order = item.order + 1;
        }
      });
    }

    const newContent: Content = {
      id: uuid(),
      type: "paragraph",
      value: "",
      isEditing: false,
      order,
    };

    setContent((content) => {
      return [...content, newContent];
    });
  }

  function handleAddLink() {
    let order = 0;

    if (content.length > 0) {
      content.forEach((item) => {
        if (item.order >= order) {
          order = item.order + 1;
        }
      });
    }

    const newContent: Content = {
      id: uuid(),
      type: "link",
      value: "",
      isEditing: false,
      order,
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

  function handleDeleteContent(id: string) {
    const newContent = content.filter((item) => item.id !== id);

    setContent(newContent);
  }

  function isValidToSubmit(): boolean {
    let isValid = true;

    content.forEach((item) => {
      if (!Boolean(item.value)) {
        isValid = false;
      }
    });

    if (!isValid) {
      toast.error(
        "Você possui item(ns) inválido(s), verifique antes de publicar."
      );
    }

    return isValid;
  }

  async function handleSubmit() {
    if (isValidToSubmit()) {
      await api.post("/posts", {
        content,
      });

      window.location.reload();
    }
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
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
              <button type="button" onClick={handleAddLink}>
                <Link />
                Link
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isPublishButtonHaveContent}
            >
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
                      autoFocus
                      onBlur={() => handleSetEditing(item.id, !item.isEditing)}
                      type="text"
                      value={item.value}
                      onChange={(e) => handleEditValue(item.id, e.target.value)}
                    />
                  </React.Fragment>
                ) : (
                  <li key={item.id}>
                    <p
                      onClick={() => handleSetEditing(item.id, !item.isEditing)}
                    >
                      {Boolean(item.value) ? (
                        item.type === "link" ? (
                          <a href="#">{item.value}</a>
                        ) : (
                          `${item.value}`
                        )
                      ) : (
                        "Clique aqui para editar o conteúdo..."
                      )}
                    </p>
                    <button
                      onClick={() => handleDeleteContent(item.id)}
                      type="button"
                    >
                      <Trash />
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </Modal>
    </div>
  );
}
