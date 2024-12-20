package com.imnotdurnk.domain.map.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Optional;

@Getter
@Setter
public class MapDto {
    private Optional<String> destLat;
    private Optional<String> destLon;
    private Optional<String> startStop;
    private Optional<Double> startDistance;
    private Optional<String> route;
    private Optional<String> destStop;
    private Optional<Double> distance;
    private Optional<Double> duration;
    private Optional<Integer> seq1;
    private Optional<Integer> seq2;
    private Optional<Integer> stopCnt; ;
    private Optional<String> routeId;
    private Optional<String> startLat;
    private Optional<String> startLon;
    private String taxi;

    // 생성자
    public MapDto(Optional<String> destLat, Optional<String> destLon,
                  Optional<String> startStop, Optional<Double> startDistance,
                  Optional<String> route, Optional<String> destStop,
                  Optional<Double> distance, Optional<Double> duration,
                  Optional<Integer> seq1, Optional<Integer> seq2, Optional<String> routeId,
                  Optional<String> startLat, Optional<String> startLon, String taxi) {
        this.destLat = destLat;
        this.destLon = destLon;
        this.startStop = startStop;
        this.startDistance = startDistance;
        this.route = route;
        this.destStop = destStop;
        this.distance = distance;
        this.duration = duration;
        this.seq1 =seq1;
        this.seq2 = seq2;
        if (seq1.isPresent() && seq2.isPresent()) {
            this.stopCnt = Optional.of(seq2.get() - seq1.get());
        } else {
            this.stopCnt = Optional.empty();
        }
        this.routeId = routeId;
        this.startLat = startLat;
        this.startLon = startLon;
        this.taxi = taxi;
    }

    public MapDto() {
    }

    public MapDto(Optional<String> destLat, Optional<String> destLon,
                  Optional<String> startStop, Optional<Double> startDistance,
                  Optional<String> route, Optional<String> destStop,
                  Optional<Double> distance, Optional<Double> duration,
                  Optional<Integer> seq1, Optional<Integer> seq2, Optional<String> routeId,
                  Optional<String> startLat, Optional<String> startLon) {
        this.startLon = startLon;
        this.startLat = startLat;
        this.routeId = routeId;
        this.seq2 = seq2;
        this.seq1 = seq1;
        if (seq1.isPresent() && seq2.isPresent()) {
            this.stopCnt = Optional.of(seq2.get() - seq1.get());
        } else {
            this.stopCnt = Optional.empty();
        }
        this.duration = duration;
        this.distance = distance;
        this.destStop = destStop;
        this.route = route;
        this.startDistance = startDistance;
        this.startStop = startStop;
        this.destLon = destLon;
        this.destLat = destLat;
    }
}

