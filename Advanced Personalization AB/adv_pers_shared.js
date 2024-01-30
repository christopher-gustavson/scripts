var exId = '{{experimentId}}';
//all variation ids in order
var vId = ['{{variationId1}}', '{{variationId2}}'];
//all audience ids in order to be personalized
var aId = ['{{audienceId1}}', '{{audienceId2}}'];
//all selectors to be used
var sel = ['{{selector1}}', '{{selector2}}'];

if (window.hasOwnProperty('optimizely')) {
    var state = window['optimizely'].get('state');
    var utils = window["optimizely"].get("utils");
    if (Object.keys(state.getExperimentStates()).length) {
        if (state.getExperimentStates()[exId].audiences.length) {
            utils.waitForElement(sel)
                .then(function(e) {
                    //control variation
                    if (state.getExperimentStates()[exId].variation.id == vId[0]) {
                        if (state.getExperimentStates()[exId].audiences[0].id == aId[0]) {
                            console.log('control audience 1');
                            //insert experience 1 changes
                            document.querySelector(sel[0]).innerHTML = "Control Experience 1";
                            document.querySelector(sel[1]).innerHTML = "Control experience 1 CTA";
                        } else if (state.getExperimentStates()[exId].audiences[0].id == aId[1]) {
                            console.log('control audience 2');
                            //insert experience 2 changes
                            document.querySelector(sel[0]).innerHTML = "Control Experience 2";
                            document.querySelector(sel[1]).innerHTML = "Control experience 2 CTA";
                        }
                        //test variation #1
                    } else if (state.getExperimentStates()[exId].variation.id == vId[1]) {
                        if (state.getExperimentStates()[exId].audiences[0].id == aId[0]) {
                            console.log('test audience 1');
                            //insert experience 1 changes
                            document.querySelector(sel[0]).innerHTML = "Test Experience 1";
                            document.querySelector(sel[1]).innerHTML = "Test experience 1 CTA";
                        } else if (state.getExperimentStates()[exId].audiences[0].id == aId[1]) {
                            console.log('test audience 2');
                            //insert experience 2 changes
                            document.querySelector(sel[0]).innerHTML = "Test Experience 2";
                            document.querySelector(sel[1]).innerHTML = "Test experience 2 CTA";
                        }
                    }
                });
        }
    }
}