import { useQuery } from "@apollo/client";

import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Outlet, useParams } from "react-router-dom";

import { GET_BOOK_DATA } from "../apollo";
import { getMappedSentence } from "../utils/mapper";
import { BookData } from "../types";
import PointsIcon from "../components/PointsIcon";

export function Pages() {
  const { loading, data } = useQuery<BookData>(GET_BOOK_DATA);

  const [content, setContent] = useState<ReactNode>();
  const [contentRight, setContentRight] = useState<ReactNode>();
  const [open, setOpen] = useState<boolean>(true);

  let { page } = useParams();
  let navigate = useNavigate();

  let idx = 0;
  if (page) {
    idx = parseInt(page);
  }

  useEffect(() => {
    if (data) {
      // proceed to manipulate content only when done loading data
      console.log(data.book.pages.length);
      let obj = { ...data };

      let contentLeft = getMappedSentence(obj.book.pages[idx]); // for left page
      let contentRight = getMappedSentence(obj.book.pages[idx + 1]); // for right page

      /*
       * Set content for the left page
       */
      setContent(
        <div
          onClick={loadToken(idx)}
          dangerouslySetInnerHTML={{ __html: contentLeft.sentence }}
        ></div>
      );

      /*
       * Set content for the right page
       */
      setContentRight(
        <div
          onClick={loadToken(idx + 1)}
          dangerouslySetInnerHTML={{ __html: contentRight.sentence }}
        ></div>
      );
    }
  }, [data, page]);

  const loadToken = (index: any) => (e: any) => {
    /*
     * When a user clicks a word, this function is called.
     * It takes the index of the current page to extract page content
     * Searches the tokens to find one which equals the ID of the target element
     * If it finds the clicked word, a new view displaying the token for the clicked word is opened
     */
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
    /*
     * Open next page set as long as the end page is not yet reached
     */
    if (data && idx < data?.book.pages.length) {
      console.log(idx);
      navigate(`/${idx + 2}/`);
    }
  };

  const previous = () => (e: any) => {
    /*
     * Open previous set of pages if current page set is above the first set
     */
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
                <PointsIcon></PointsIcon> 20
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
