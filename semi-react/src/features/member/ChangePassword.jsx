import { useState } from "react";
import {
  Page,
  Card,
  Title,
  Sub,
  Field,
  Label,
  Input,
  Button,
  DangerButton,
  Message,
  Hint,
} from "../styles/AuthForm.styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const ChangePassword = () => {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [newPwdConfirm, setNewPwdConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);

  const navi = useNavigate();

  const mismatch = newPwdConfirm.length > 0 && newPwd !== newPwdConfirm;

  const onSubmit = async () => {
    if (!currentPwd || !newPwd) {
      setStatus("모든 항목을 입력해주세요");
      return;
    }
    if (mismatch) {
      setStatus("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // async / await는 .then() .catch()를 위에서 아래로 읽기 편하게 쓴 문법
    try {
      await api.patch("/members", {
        memberPwd: currentPwd,
        updatePwd: newPwd,
      });
      setStatus("비밀번호가 변경되었습니다.");
      setCurrentPwd("");
      setNewPwd("");
      setNewPwdConfirm("");
      navi("/");
    } catch (err) {
      setStatus(err.response.data.message);
    } finally {
      isLoading(false);
    }

    /*
    axios
      .patch(
        "http://localhost/api/members",
        {
          memberPwd: currentPwd,
          updatePwd: newPwd,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getIten("token")}`,
          },
        },
      )
      .then((result) => {
        console.log(result);
        if (result.status == 200) {
          alert("성공");
        }
      }).catch(err => {~~~});
      */
  };

  return (
    <Page>
      <Card>
        <Title>비밀번호 바꾸기</Title>
        <Sub>안전한 사용을 위해 3개월마다 바꾸기를 권장드립니다.</Sub>
        <Field>
          <Label>현재 비밀번호</Label>
          <Input
            type="password"
            placeholder="현재 비밀번호"
            onChange={(e) => setCurrentPwd(e.target.value)}
          />
        </Field>
        <Field>
          <Label>새 비밀번호</Label>
          <Input
            type="password"
            placeholder="새 비밀번호"
            onChange={(e) => setNewPwd(e.target.value)}
          />
        </Field>
        <Field>
          <Label>새 비밀번호 확인</Label>
          <Input
            type="password"
            placeholder="새 비밀번호 확인"
            onChange={(e) => setNewPwdConfirm(e.target.value)}
          />
          {mismatch && <Hint $error>비밀번호가 일치하지 않습니다.</Hint>}
        </Field>

        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "바꾸는 중" : "비밀번호 바꾸기"}
        </Button>

        {status && <Message>{status}</Message>}
      </Card>
    </Page>
  );
};

export default ChangePassword;
