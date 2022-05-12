import { useQuery } from "@apollo/client";

import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";

import { GET_BOOK_DATA } from "../apollo";
import { getMappedSentence } from "../utils/mapper";
import { BookData } from "../types";

export function Pages() {
  const { loading, data } = useQuery<BookData>(GET_BOOK_DATA);
  const [content, setContent] = useState<ReactNode>();
  const [contentRight, setContentRight] = useState<ReactNode>();
  const [open, setOpen] = useState<boolean>(true);

  let { page } = useParams();
  let idx = 0;
  if (page) {
    idx = parseInt(page);
  }

  let navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log(data.book.pages.length);
      let obj = { ...data };
      let contentLeft = getMappedSentence(obj.book.pages[idx]);
      let contentRight = getMappedSentence(obj.book.pages[idx + 1]);

      setContent(
        <div
          onClick={loadToken(idx)}
          dangerouslySetInnerHTML={{ __html: contentLeft.sentence }}
        ></div>
      );
      setContentRight(
        <div
          onClick={loadToken(idx + 1)}
          dangerouslySetInnerHTML={{ __html: contentRight.sentence }}
        ></div>
      );
    }
  }, [data, page]);

  const loadToken = (index: any) => (e: any) => {
    if (data) {
      let tokens = data.book.pages[index].tokens;
      if (e.target.id) {
        const item = tokens?.find(
          (a) => a.position[0] === parseInt(e.target.id)
        );
        if (item) {
          setOpen(true);
          navigate(`/${idx}/${item?.value}`);
        }
      }
    }
  };

  const next = () => (e: any) => {
    if (data && idx < data?.book.pages.length) {
      console.log(idx);
      navigate(`/${idx + 2}/`);
    }
  };

  const previous = () => (e: any) => {
    if (data && idx > 2) {
      navigate(`/${idx - 2}/`);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className="page">
            <div className="top_nav">
              <span className="book_title">{data && data.book.title}</span>
              <span className="points">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="points_icon"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>{" "}
                20
              </span>
            </div>
            <div className="content">
              <div className="content_left">{data && content}</div>
              <div className="content_right">{data && contentRight}</div>
            </div>
            <div className="bottom_nav">
              <button className="btn_default" onClick={previous()}>
                Previous
              </button>
              <button className="btn_default" onClick={next()}>
                Next
              </button>
            </div>
          </div>
          <Outlet context={[open, setOpen]} />
        </>
      )}
    </div>
  );
}
