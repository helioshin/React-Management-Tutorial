import React, { Component } from 'react';
import './App.css';
import CustomerAdd from './components/CustomerAdd';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell'; 
import { withStyles } from '@material-ui/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
/*
  1.constructor()
  2.componentWillMount()
  3.render()
  4.componentDidMount()

  props or state => shouldComponentUpdate() >> render()
*/
const styles = theme => ({
  root: {
    width: '100%',
    margin: 20,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: 10
  }
});

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    }); 
    this.callApi()
    .then(res => this.setState({customers: res}))
    .catch(err => console.log(err));
  }

  //컴포넌트 마운트가 끝난 이후 호출되는 내장함수
  componentDidMount() {
    this.timer = setInterval(this.progress, 50);
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

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1});
  }

  render(){
    const { classes } = this.props;
    return(
      <>
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
                }) : 
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
          <Button variant="">Yes!!</Button>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </>
    );
  }
}

export default withStyles(styles)(App);