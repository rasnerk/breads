const React = require('react')
const Default = require('./layouts/Default')

function ErrorPage () {
    return (
        <Default>
            <h3>Oops... Something went wrong</h3>
            <a href='/'>Return to home</a>
        </Default>
    )
}

module.exports = ErrorPage