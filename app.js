(function () {
    'use strict';

    var _ = require('lodash'),
        React = require('react'),
        Modal = require('react-modal');

    var appElement = document.getElementById('content');

    var Score = React.createClass({
        render: function() {
            var residue = 300 - this.props.value;
            return <div className='score'>{this.props.value} / {residue}</div>;
        }
    });

    var AddScore = React.createClass({
        getInitialState: function() {
            return { player: this.props.player, newScore: '' };
        },

        handleNumberClick: function(num) {
            this.setState(_.merge(this.state, { newScore: ('' + this.state.newScore + num) }));
        },

        handleCancelClick: function() {
            this.state.newScore = '';
            this.props.onCancelHandler();
        },

        handleConfirmClick: function() {
            this.props.onConfirmHandler(this.state.newScore);
        },

        render: function() {
            var self = this,
                newScore = (this.state.newScore ? <span> + {this.state.newScore}</span> : ''),
                buttons = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, 'cancel', 'ok']].map(function(row) {
                var buttonRow = row.map(function(item) {
                    var clickHandler,
                        className = 'btn btn-primary btn-lg btn-block';
                    if (item === 'cancel') {
                        clickHandler = self.handleCancelClick.bind(self);
                        className += ' btn-danger';
                    } else if (item === 'ok') {
                        className += ' btn-success';
                        clickHandler = self.handleConfirmClick.bind(self);
                    } else {
                        clickHandler = self.handleNumberClick.bind(self, item);
                    }

                    return (
                        <div className='btn-group'>
                            <button
                                type='button'
                                className={className}
                                onClick={clickHandler}>{item}</button>
                        </div>
                    );
                });
                return (
                    <div className='btn-group btn-group-justified'>{buttonRow}</div>
                );
            });

            return (
                <div>
                    <span><b>{this.state.player.name}</b>: </span>
                    <span>{this.state.player.score}</span> {newScore}
                    <div>{buttons}</div>
                </div>
            );
        }
    });

    var PlayerRow = React.createClass({
        getInitialState: function() {
            return { player: this.props.player, modalIsOpen: false };
        },

        handleAddScore: function() {
            this.setState(_.merge(this.state, { modalIsOpen: true }));
        },


        closeModal: function() {
            this.setState(_.merge(this.state, {modalIsOpen: false}));
        },

        confirmNewScore: function(newScore) {
            this.setState(_.merge(this.state, {
                player: {
                    name: this.state.player.name,
                    score: (this.state.player.score + Number(newScore))
                },
                modalIsOpen: false }));
        },

        render: function() {
            return (
                <div className='player'>
                    <div className='playerName'>{this.props.player.name}</div>
                    <div className='playerScore' onClick={this.handleAddScore}>
                        <Score value={this.state.player.score}/>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                    >
                        <AddScore
                            player={this.props.player}
                            onConfirmHandler={this.confirmNewScore}
                            onCancelHandler={this.closeModal} />
                    </Modal>
                </div>
            );
        }
    });

    var DartsApp = React.createClass({
        getInitialState: function() {
            return {data: [
                { name: 'Anton', score: 245 },
                { name: 'Julia', score: 120 },
                { name: 'MishGun', score: 241 },
                { name: 'Шпулена', score: 187 }]
            };
        },

        render: function() {
            return (
                <div className='dartsApp'>
                    <Players data={this.state.data} />
                </div>
            );
        }
    });

    var Players = React.createClass({
        handleLastScoreConfirmed: function() {

        },
        render: function() {
            var self = this;
            var playerNodes = this.props.data.map(function(player, index) {
                return (
                    <PlayerRow
                        player={player}
                        key={index}
                        onLastScoreConfirmed={self.handleLastScoreConfirmed.bind(self)} />
                );
            });
            return (
                <div className='players'>
                    {playerNodes}
                </div>
            );
        }
    });

    Modal.setAppElement(appElement);
    Modal.injectCSS();

    React.render(<DartsApp />, appElement);
}());
