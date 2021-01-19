import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Container } from 'react-bootstrap'
import Footer from './components/Footer'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import RegisterChildScreen from './screens/RegisterChildScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Switch>
            <Route exact path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route exact path='/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/' component={HomeScreen} />
            <Route path='/admin/orders' component={OrderListScreen} />
            <Route path='/admin/users/:id/edit' component={UserEditScreen} />
            <Route path='/admin/users' component={UserListScreen} />
            <Route exact path='/admin/products/:id/edit' component={ProductEditScreen} />
            <Route exact path='/admin/products/:pageNumber' component={ProductListScreen} />
            <Route exact path='/admin/products' component={ProductListScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route path='/register/:token' component={RegisterChildScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/place-order' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
