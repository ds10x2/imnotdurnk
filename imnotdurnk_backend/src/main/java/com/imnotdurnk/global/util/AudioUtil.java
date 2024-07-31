package com.imnotdurnk.global.util;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;

@Component
@NoArgsConstructor
public class AudioUtil {

    private FileInputStream fstream = null;
    private byte[] audioBytes = new byte[1024];
    private byte[] buff = new byte[1024];
    private int read;

    // 리니어 PCM 인코딩 및 지정된 파라미터를 가지는 AudioFormat를 구축
    // http://cris.joongbu.ac.kr/course/java/api/javax/sound/sampled/AudioFormat.html
    private static final AudioFormat FORMAT = new AudioFormat(
            16_000, // 16 kHz, sampleRate
            16, // 16 bits, sampleSizeInBits
            1, // Mono, int channels
            true, // Signed
            false // Little endian, True is BigEndian
    );

    /***
     * 바이트 배열을 raw 파일로 저장
     * @param file
     * @throws UnsupportedAudioFileException
     */
    //바이트 배열을 Raw 파일로 저장
    //Save byte array as Raw file
    public String SaveRaw(File file) throws UnsupportedAudioFileException {
        OutputStream output = null;

        String output_title = "output_" + LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmm")) + "raw";

        try {
            output = new FileOutputStream(output_title);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        try {
            //바이트 변환 -> 포맷 변환 -> wav에서 raw로 변환
            output.write(formatWavToRaw(changeFormat(AudioToByte(file), FORMAT)));
            return output_title;

        } catch (IOException e) {
            e.printStackTrace();
        }

        return output_title;
    }

    /***
     * Wav 파일에서 header 제거
     * @param audioFileContent
     * @return
     */
    public byte[] formatWavToRaw(@NotNull final byte[] audioFileContent) {
        return Arrays.copyOfRange(audioFileContent, 44, audioFileContent.length);
    }

    /***
     * Wav 파일을 다른 형식의 Wav 형식으로 변환
     * @param audioFileContent
     * @param audioFormat
     * @return
     * @throws IOException
     * @throws UnsupportedAudioFileException
     */
    public byte[] changeFormat(@NotNull final byte[] audioFileContent, @NotNull final AudioFormat audioFormat)
            throws IOException, UnsupportedAudioFileException {
        try (final AudioInputStream originalAudioStream = AudioSystem
                .getAudioInputStream(new ByteArrayInputStream(audioFileContent));
             final AudioInputStream formattedAudioStream = AudioSystem.getAudioInputStream(audioFormat,
                     originalAudioStream);
             final AudioInputStream lengthAddedAudioStream = new AudioInputStream(formattedAudioStream, audioFormat,
                     audioFileContent.length);
             final ByteArrayOutputStream convertedOutputStream = new ByteArrayOutputStream()) {
            AudioSystem.write(lengthAddedAudioStream, AudioFileFormat.Type.WAVE, convertedOutputStream);
            return convertedOutputStream.toByteArray();
        }
    }

    /***
     * 기존의 wav 파일을 바이트 배열로 변환
     * @param file
     * @return
     */
    public byte[] AudioToByte(File file) {
        try {
            File inFile = file;
            fstream = new FileInputStream(inFile);

            ByteArrayOutputStream out = new ByteArrayOutputStream();
            BufferedInputStream in = new BufferedInputStream(fstream);

            while ((read = in.read(buff)) > 0) {
                out.write(buff, 0, read);
            }
            out.flush();
            audioBytes = out.toByteArray();

        } catch (FileNotFoundException ex) {

        } catch (IOException e) {
            e.printStackTrace();
        }
        return audioBytes;
    }

}