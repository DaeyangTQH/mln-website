import { useEffect, useState } from "react";
import marxChatbot from "../assets/chatbot/karl-marx-chibi.png";

const GREETINGS = [
  "Ta là ai, bài này là gì?",
  "Chân lý đang trốn ở đâu?",
  "Không hiểu cũng là một bước.",
  "Học hay không học, vẫn phải thi.",
  "Mọi đáp án đều đáng nghi.",
  "Câu hỏi tạo nên con người.",
  "Điểm số có thật sự tồn tại?",
  "Biết mình chưa biết là tốt.",
  "Tư duy đi, đừng đoán mò.",
  "Sai lầm cũng có giá trị.",
  "Bản chất vấn đề là gì?",
  "Đừng tin ngay cả chính mình.",
  "Mâu thuẫn ở đâu, đáp án ở đó.",
  "Không hỏi, sao biết mình sai?",
  "Sự thật thường nằm cuối bài.",
  "Deadline chỉ là một khái niệm.",
  "Bài khó hay lòng ta yếu?",
  "Đáp án có trước câu hỏi chăng?",
  "Học để biết mình chưa biết.",
  "Mọi con đường đều dẫn đến thi.",
  "Tồn tại hay qua môn?",
  "Chép bài không tạo ra tri thức.",
  "Ta suy nghĩ, nên ta... mệt.",
  "Kiến thức là vô hạn, giờ học thì không.",
  "Đừng để đáp án đánh lừa.",
  "Câu này dễ theo nghĩa nào?",
  "Hôm nay ta nghi ngờ điều gì?",
  "Bài tập là phép thử ý chí.",
  "Chân lý không nằm trong đáp án A.",
  "Suy cho cùng, vẫn phải làm bài.",
  "Cái khó ló ra cái... khó hơn.",
  "Hiểu bài là một trạng thái tạm thời.",
  "Không có câu hỏi nào vô tri.",
  "Tri thức bắt đầu từ sự hoang mang.",
  "Một phút suy tư, mười phút ngủ.",
  "Bài này đang thử thách nhân sinh.",
  "Hãy để lý trí lên tiếng.",
  "Càng học, càng thấy chưa học.",
  "Đáp án đúng cũng cần được chất vấn.",
  "Điểm thấp chỉ là hiện tượng."
];

export default function ChatMascot() {
  const [text, setText] = useState("");

  useEffect(() => {
    let sentence = 0;
    let index = 0;
    let deleting = false;
    let timer;

    const type = () => {
      const current = GREETINGS[sentence];
      index += deleting ? -1 : 1;
      setText(current.slice(0, index));

      let delay = deleting ? 34 : 62;
      if (!deleting && index === current.length) {
        deleting = true;
        delay = 1800;
      } else if (deleting && index === 0) {
        deleting = false;
        sentence = (sentence + 1) % GREETINGS.length;
        delay = 420;
      }
      timer = window.setTimeout(type, delay);
    };

    timer = window.setTimeout(type, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <button className="chat-bubble" type="button" aria-label="Mở trợ giảng AI">
      <span className="cb-greeting" aria-hidden="true">
        <span className="cb-greeting-text">{text}</span>
        <span className="cb-type-caret"></span>
      </span>
      <img className="cb-avatar" src={marxChatbot} alt="" aria-hidden="true" />
    </button>
  );
}
