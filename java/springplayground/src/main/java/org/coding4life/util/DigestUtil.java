package org.coding4life.util;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by QuSheng on 2017/4/25.
 */
public class DigestUtil {

    private final static int A = 0x67452301;
    private final static int B = 0xefcdab89;
    private final static int C = 0x98badcfe;
    private final static int D = 0x10325476;

    private static final int[] SHIFT_AMTS = {
            7, 12, 17, 22,
            5,  9, 14, 20,
            4, 11, 16, 23,
            6, 10, 15, 21
    };

    private static final int[] TABLE_T = new int[64];
    static {
        for (int i = 0; i < 64; i++)
            TABLE_T[i] = (int)(long)((1L << 32) * Math.abs(Math.sin(i + 1)));
    }

    public static byte[] md5(String str) throws UnsupportedEncodingException {

        //Pre-processing:
        byte[] paramBytes = str.getBytes("UTF-8");
        int num = (paramBytes.length + 8) / 64 + 1;

        byte[] message = new byte[num * 64];
        for(int i = 0; i < message.length; i++) {
            message[i] = 0;
        }

        for(int i = 0; i < paramBytes.length; i++) {
            message[i] = paramBytes[i];
        }

        message[paramBytes.length]  = (byte) 0x80;


        long lengthBits = (long) paramBytes.length * 8;

        for(int i = 0; i < 8; i++) {
            message[message.length - 8 + i] = (byte) lengthBits;
            lengthBits >>>= 8;
        }

        int a = A;
        int b = B;
        int c = C;
        int d = D;

        int[] buffer = new int[16];
        for(int i = 0; i < num; i++) {
            int index = i << 6;
            for (int j = 0; j < 64; j++, index++) {
                buffer[j >>> 2] = ((int) message[index] << 24) | (buffer[j >>> 2] >>> 8);
            }

            int originalA = a;
            int originalB = b;
            int originalC = c;
            int originalD = d;

            for(int j = 0; j < 64; j++) {
                int div16 = j >>> 4;
                int f = 0;
                int bufferIndex = j;

                switch (div16) {
                    case 0:
                        f = (b & c) | (~b & d);
                        break;
                    case 1:
                        f = (b & d) | (c & ~d);
                        bufferIndex = (bufferIndex * 5 + 1) & 0x0F;
                        break;
                    case 2:
                        f = b ^ c ^ d;
                        bufferIndex = (bufferIndex * 3 + 5) & 0x0F;
                        break;
                    case 3:
                        f = c ^ (b | ~d);
                        bufferIndex = (bufferIndex * 7) & 0x0F;
                        break;
                }

                int temp = b + Integer.rotateLeft(a + f + buffer[bufferIndex] + TABLE_T[j], SHIFT_AMTS[(div16 << 2) | (j & 3)]);

                a = d;
                d = c;
                c = b;
                b = temp;
            }

            a += originalA;
            b += originalB;
            c += originalC;
            d += originalD;
        }


        byte[] md5 = new byte[16];
        int count = 0;
        for (int i = 0; i < 4; i++) {
            int n = (i == 0) ? a : ((i == 1) ? b : ((i == 2) ? c : d));
            for (int j = 0; j < 4; j++) {
                md5[count++] = (byte) n;
                n >>>= 8;
            }
        }
        return md5;
    }

    public static void main(String[] args) {

        try {
            String testCase = "12345";
            byte[] testByte = testCase.getBytes("UTF-8");
            byte[] actual = md5(testCase);
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] expected = md.digest(testByte);

            System.out.println(String.format("actual = %s, expected = %s", byte2hex(actual), byte2hex(expected)));

            return;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }

    public static byte[] toByteArray(int[] data) {
        ByteBuffer byteBuffer = ByteBuffer.allocate(data.length * 4);
        IntBuffer intBuffer = byteBuffer.asIntBuffer();
        intBuffer.put(data);

        byte[] array = byteBuffer.array();

        return array;
    }

    public static String byte2hex(byte[] arr) {
        StringBuffer sb = new StringBuffer();
        for(byte b : arr) {
            sb.append(String.format("%02x", b));
        }

        return sb.toString();
    }
}
