import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TaskCard from './TaskCard';
import Header from '../Header';
import CardsHeader from './TasksHeader';
import ReactPaginate from 'react-paginate';
import { fetchTasks, setOffset } from '../../redux/todo';
import TaskForm from './TaskForm';
import { checkAuth } from '../../redux/auth';

function Feed() {
  const { tasks, totalTasksCount, limit } = useSelector(store => store.todo);
  let pageCount = Math.ceil(totalTasksCount / limit);
  pageCount = pageCount > 1 ? pageCount : 0;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(fetchTasks({}))
  }, [dispatch]);

  const handlePageClick = async (event) => {
    const offset = (event.selected * limit) % totalTasksCount;
    dispatch(setOffset(offset));
    dispatch(fetchTasks())
  };

  return (
    <>
      <Header />
      <Container className="vh-80 pt-3 pb-5">
        <Row>
          <Col className="col-lg-4">
            <TaskForm />
          </Col>
        </Row>
        <Row>
          <Col>
            {!!tasks.length && (
              <>
                <CardsHeader />
                <div className="pb-3">
                  {tasks.map(task => (
                    <TaskCard {...task} key={task.id} />
                  ))}
                </div>
              </>
            )}
            <ReactPaginate
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={pageCount}
              previousLabel="prev"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Feed;
