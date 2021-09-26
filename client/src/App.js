import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'; 
import { withStyles } from '@material-ui/styles';
import Button from '@mui/material/Button';

const styles = theme => ({
  root: {
    width: '100%',
    margin: 20,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
});

class App extends Component {

  state = {
    customers: ""
  }
  //컴포넌트 마운트가 끝난 이후 호출되는 내장함수
  componentDidMount() {
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }
  //고객정보 비동기 요청
  callApi = async() => {
    //localhost의 하기 주소로 비동기로 요청
    const response = await fetch('/api/customers');
    //요청 받은 데이터를 json형태로 추출
    const body = await response.json();
    return body;
  }

  render(){
    const { classes } = this.props;
    return(
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
              {this.state.customers ? this.state.customers.map(c => {
                return(
                  <Customer
                    key = {c.id}
                    id = {c.id}
                    image = {c.image}
                    name = {c.name}
                    birthday = {c.birthday}
                    gender = {c.gender}
                    job = {c.job}
                  / >
                );
              }) : "데이터 로딩중 입니다."
            }
          </TableBody>
        </Table>
        <Button variant="">Yes!!</Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);