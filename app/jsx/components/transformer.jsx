/** @jsx React.DOM*/
var React = require('react/addons');
module.exports = React.createClass({
    getInitialState: function() {
        return {
            input: '/** @jsx React.DOM*/\nvar component = React.createClass({\n\trender: function() {\n\t\treturn (\n\t\t\t<div className=\"row\">This is awesome</div>\n\t\t);\n\t}\n});\nReact.renderComponent(<component />, document.getElementById(\'component\'));',
            output: '',
            error: ''
        };
    },
    componentDidMount: function() {
        var component = this.refs.aceEditor.getDOMNode();
        var editor = ace.edit(component);
        var self = this;
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/javascript');
        editor.on('change', function(e) { self.update(editor.getSession().getValue()); });

        this.update(this.state.input);
    },
    update: function(code) {
        try {
            this.setState({
                output: JSXTransformer.transform(code).code,
                error: ''
            });
        } catch(err) {
            this.setState({ error: err.message });
        }
    },
    bindElement: function() {
        if (this.state.error !== '') { alert('Fix the bug first!'); }
        var exec = new Function(this.state.output);
        exec();
    },
    render: function() {
        return (
            <div className="row">
                <div className="row">
                    <p className="col-sm-12 col-md-12 alert alert-danger">&nbsp;{this.state.error}</p>
                </div>
                <div className="row">
                    <button type="button" className="btn btn-success pull-right" onClick={this.bindElement}>Run</button>
                </div>
                <div className="row" style={{marginTop: '10px'}}>
                    <div ref="aceEditor" style={{height: '300px'}} className="col-sm-6 col-md-6">{this.state.input}</div>
                    <pre className="col-sm-6 col-md-6">{this.state.output}</pre>
                </div>
            </div>
        );
    }
});
