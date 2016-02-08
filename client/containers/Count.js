import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import * as CounterActions from '../actions/counter';

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(CounterActions, dispatch);
};

const Count = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default Count;
