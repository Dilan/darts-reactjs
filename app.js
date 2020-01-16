import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

(function () {
    'use strict';

    class Score extends React.Component {
        render() {
            var residue = 300 - this.props.value;
            return <div className='score'>{this.props.value} / {residue}</div>;
        }
    };

    class AddScore extends React.Component {

        constructor(props) {
            super(props);

            this.state = { player: this.props.player, newScore: '' };

            this.handleNumberClick = this.handleNumberClick.bind(this);
            this.handleCancelClick = this.handleCancelClick.bind(this);
            this.handleConfirmClick = this.handleConfirmClick.bind(this);
        }

        handleNumberClick(num) {
            this.setState(Object.assign(this.state, { newScore: ('' + this.state.newScore + num) }));
        }

        handleCancelClick() {
            this.state.newScore = '';
            this.props.onCancelHandler();
        }

        handleConfirmClick() {
            this.props.onConfirmHandler(this.state.newScore);
        }

        render() {
            var k;
            var self = this,
                newScore = (this.state.newScore ? <span> + {this.state.newScore}</span> : ''),
                buttons = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0, 'cancel', 'ok']].map(function(row,i) {
                var buttonRow = row.map(function(item,j) {
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

                    k = i.toString() + '-' + j.toString();

                    return (
                        <div className='btn-group' key={k}>
                            <button
                                type='button'
                                className={className}
                                onClick={clickHandler}>{item}</button>
                        </div>
                    );
                });
                return (
                    <div className='btn-group btn-group-justified' key={k}>{buttonRow}</div>
                );
            });

            return (
                <div key={Math.random()}>
                    <span><b>{this.state.player.name}</b>: </span>
                    <span>{this.state.player.score}</span> {newScore}
                    <div>{buttons}</div>
                </div>
            );
        }
    };

    class PlayerRow extends React.Component {

        constructor(props) {
            super(props);

            this.state = { player: this.props.player, modalIsOpen: false };

            this.onConfirmHandler = this.onConfirmHandler.bind(this);
            this.handleAddScore = this.handleAddScore.bind(this);
            this.closeModal = this.closeModal.bind(this);
        }

        handleAddScore() {
            this.setState(Object.assign(this.state, { modalIsOpen: true }));
        }

        closeModal() {
            this.setState(Object.assign(this.state, {modalIsOpen: false}));
        }

        onConfirmHandler(newScore) {
            this.setState(Object.assign(this.state, {
                player: {
                    name: this.state.player.name,
                    score: (this.state.player.score + Number(newScore))
                },
                modalIsOpen: false })
            );
        }

        render() {
            return (
                <div className='player' key={Math.random()}>
                    <div className='playerName'>{this.state.player.name}</div>
                    <div className='playerScore' onClick={this.handleAddScore}>
                        <Score value={this.state.player.score} />
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                    >
                        <AddScore
                            key={Math.random()}
                            player={this.state.player}
                            onConfirmHandler={this.onConfirmHandler}
                            onCancelHandler={this.closeModal} />
                    </Modal>
                </div>
            );
        }
    };

    class DartsApp extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                data: [
                    { name: 'Anton', score: 245 },
                    { name: 'Julia', score: 120 },
                    { name: 'MishGun', score: 241 },
                    { name: 'Shulya', score: 187 }
                ]
            };
        }

        render() {
            return (
                <div className='dartsApp'>
                    <Players data={this.state.data} />
                </div>
            );
        }
    };

    class Players extends React.Component {

        handleLastScoreConfirmed() {

        }
        render() {
            var self = this;
            var playerNodes = this.props.data.map(function(player, index) {
                return (
                    <PlayerRow
                        key={player.name}
                        player={player}
                        onLastScoreConfirmed={self.handleLastScoreConfirmed.bind(self)} />
                );
            });
            return (
                <div className='players'>
                    {playerNodes}
                </div>
            );
        }
    };

    var appElement = document.getElementById('content');
    Modal.setAppElement(appElement);
    ReactDOM.render(<DartsApp />, appElement);
}());
