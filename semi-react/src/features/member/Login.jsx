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
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [memberId, setMemberId] = useState("");
  const [memberPwd, setMemberPwd] = useState("");
  const [status, setStatus] = useState("");
  const [loading, isLoading] = useState(false);
  const navi = useNavigate();

  const onChangeId = (e) => {
    setMemberId(e.target.value);
  };
  const onChangePwd = (e) => {
    setMemberPwd(e.target.value);
  };

  const onSubmit = () => {
    if (!memberId || !memberPwd) {
      setStatus("아이디와 비밀번호를 입력하셔야 합니다.");
      return;
    }

    isLoading(true);
    setStatus("");
    axios
      .post("http://localhost/api/auth/login", {
        memberId,
        memberPwd,
      })
      .then((result) => {
        console.log(result);
        // Cookie, SessionStorage, LocalStorage
        // 제외, 종료시 날라감, 껏다켜도 유지
        //            JS로 읽고 쓰기 가능 XSS(악성스크립주입)에 취약
        // CSRF에 취약
        // 실무에서 안전한 방법을 택해야함
        // accessToken을 저장소에 저장안하고 메모리
        // refreshToken은 HttpOnly켜서 쿠키에 저장

        // localStorage.setItem("token", result.data.accessToken);
        // alert(localStorage.getItem("token"));
        login(result.data);
        navi("/");
      })
      .catch((err) => {
        // console.log(err.response);
        if (err.response?.data.code === 400) {
          setStatus(err.response.data.message);
        } else {
          setStatus("로그인에 실패했습니다.");
        }
        isLoading(false);
      });
  };

  const onKeyDown = (e) => {
    if (e.key == "Enter") onSubmit();
  };

  return (
    <Page>
      <Card>
        <Title>로그인</Title>
        <Sub>로그인 하십시오</Sub>

        <Field>
          <Label>아이디</Label>
          <Input
            placeholder="아이디를 입력하세요"
            onChange={onChangeId}
            onKeyDown={onKeyDown}
          />
        </Field>
        <Field>
          <Label>비밀번호</Label>
          <Input
            placeholder="비밀번호를 입력하세요"
            type="password"
            onChange={onChangePwd}
            onKeyDown={onKeyDown}
          />
        </Field>
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "로그인중..." : "로그인"}
        </Button>
        {status?.length > 0 && <Message>{status}</Message>}
      </Card>
    </Page>
  );
};

export default Login;
