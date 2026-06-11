import { useState, useEffect } from "react";
import {
  Section,
  Heading,
  Empty,
  List,
  CommentItem,
  Meta,
  Writer,
  DateText,
  Body,
  Form,
  CommentInput,
  SubmitButton,
  LoginHint,
} from "./styles/Comment.styles";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const CommentSection = ({ boardNo }) => {
  const { isLogin } = useAuth();
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, isLoading] = useState(false);

  const load = () => {
    api
      .get("/comments", { params: { boardNo } })
      .then((result) => setComments([...result.data.data]));
  };

  useEffect(() => {
    load();
  }, [boardNo]);

  const onSubmit = async () => {
    isLoading(true);
    try {
      await api.post("/comments", {
        refBoardNo: boardNo,
        commentContent: content,
      });
      setContent("");
      load();
    } catch {
      alert("댓글 작성에 실패했습니다.");
    } finally {
      isLoading(false);
    }
  };

  return (
    <Section>
      <Heading>댓글</Heading>

      {isLogin ? (
        <Form>
          <CommentInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글 작성해주세요"
          />
          <SubmitButton
            disabled={loading || !content.trim()}
            onClick={onSubmit}
          >
            {loading
              ? "등록 중..."
              : !content.trim()
                ? "내용을 입력하세요"
                : "댓글 등록"}
          </SubmitButton>
        </Form>
      ) : (
        <LoginHint>댓글 작성을 로그인이 필요합니다.</LoginHint>
      )}

      <br />

      {comments.length === 0 ? (
        <Empty>댓글이 없습니다.</Empty>
      ) : (
        <List>
          {comments.map((c) => (
            <CommentItem key={c.commentNo}>
              <Meta>
                <Writer>{c.commentWriter}</Writer>
                <DateText>{c.commentDate}</DateText>
              </Meta>
              <Body>{c.commentContent}</Body>
            </CommentItem>
          ))}
        </List>
      )}
    </Section>
  );
};

export default CommentSection;
