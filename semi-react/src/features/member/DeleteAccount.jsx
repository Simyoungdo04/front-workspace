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
import { useAuth } from "../../context/AuthContext";

const DeleteAccount = () => {
  const { logout } = useAuth();
  const navi = useNavigate();
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, isLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const onSubmit = async () => {
    if (!password) {
      setStatus("비밀번호를 입력해주세요");
      return;
    }
    if (!agree) {
      setStatus("유의사항에 동의해주세요");
      return;
    }

    isLoading(true);
    setStatus("");
    try {
      await api.delete("/members", { data: { password } });
      logout();
      navi("/");
    } catch (e) {
      setStatus(e.response?.data.message || "회원탈퇴 실패");
    } finally {
      isLoading(false);
    }
  };

  return (
    <Page>
      <Card>
        <Title>회원 탈퇴하기</Title>
        <Sub>메일 보내면 살려드림</Sub>

        <ul
          style={{
            padding: "0px",
            fontSize: "12px",
            color: "grey",
          }}
        >
          <li>탈퇴 후 동일한 아이디로 재가입 할 수 없습니다.</li>
          <li>작성하신 데이터는 정책에 때라 보관됩니다.</li>
        </ul>

        <Field>
          <Label>비밀번호를 입력하세요</Label>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Field>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            margin: "4px 0 20px",
            color: "crimson",
          }}
        >
          <input
            type="checkbox"
            style={{ width: "15px", height: "15px" }}
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <span>유의사항을 모두 확인했으며 탈퇴에 동의하겠습니다.</span>
        </label>
        <DangerButton disabled={loading} onClick={onSubmit}>
          {loading ? "탈퇴하는 중..." : "탈퇴하기"}
        </DangerButton>
      </Card>
    </Page>
  );
};

export default DeleteAccount;
