---
date: '2023-02-21'
title: 'diff-svc 음성파일 (전처리)만드는 법'
categories: ['Python', 'diff-svc']
summary: 'PyDub 라이브러리를 사용하여 음성 파일을 자동으로 분리하고 무음을 제거하는 Python 코드입니다. diff-svc 음성파일을 더 쉽게 만들기 위해 제작하였습니다.'
thumbnail: './diffsvc.png'
---

아래는 PyDub 라이브러리를 사용하여 음성 파일을 자동으로 분리하고 무음을 제거하는 Python 코드입니다. diff-svc 음성파일을 더 쉽게 만들기 위해 제작하였습니다.

# PyDub을 사용한 음성 파일 분리 및 무음 제거

## 개요

이번 포스트에서는 Python 라이브러리인 PyDub을 사용하여 음성 파일을 전처리하는 방법을 알아보겠습니다. PyDub은 오디오 파일의 다양한 처리 작업을 수행할 수 있는 라이브러리로, 간단한 API와 함께 사용하기 쉽습니다. 이번 포스트에서는 PyDub을 사용하여 음성 파일을 무음 구간을 기준으로 분리하고, 분리된 오디오 조각들을 최대 15초까지만 선택하여 WAV 파일로 저장하고, 마지막으로 무음을 제거하는 작업을 수행하는 코드를 살펴보겠습니다.

### 들어가기에 앞서 아래코드는 pydub 라이브러리가 필요합니다.

파이썬 2.7, 3.3 이상의 버전에서 사용 가능합니다. pydub를 설치하려면 pip를 사용합니다.

```
pip install pydub

```

## 코드

먼저 필요한 라이브러리를 import합니다.

```
from pydub import AudioSegment
from pydub.silence import split_on_silence
import os
import subprocess

```

다음으로, 입력 파일 경로와 출력 폴더를 설정합니다.

```
input_file = 'input_file.mp3'
output_folder = 'output_folder'

```

이제, 입력 파일을 PyDub으로 로드하고, 샘플링 레이트, 채널, 샘플 넓이를 설정합니다.

```
sound = AudioSegment.from_file(input_file)
sound = sound.set_frame_rate(44100).set_channels(1).set_sample_width(2)

```

이제, PyDub의 split_on_silence() 함수를 사용하여 입력된 음성 파일을 무음을 기준으로 자동으로 분리합니다. 이 함수는 최소 무음 길이, 무음으로 간주되는 dBFS 값, 분리된 각 음성 조각들 간의 추가적인 무음 길이를 인자로 받습니다.

```
audio_chunks = split_on_silence(sound,
    min_silence_len=1000, # 최소 무음 길이 (밀리초 단위)
    silence_thresh=-35, # 무음으로 간주되는 dBFS 값
    keep_silence=500 # 분리된 오디오 조각들 간의 추가적인 무음 길이 (밀리초 단위)
)

```

분리된 음성 조각들 중 최대 15초까지만 선택하여 WAV 파일로 저장합니다.
이 작업은 각 음성의 길이가 너무 긴 경우 파일 크기가 너무 커지는 것을 방지하기 위한 것입니다.

```
for i, chunk in enumerate(audio_chunks):
    if len(chunk) > 15000:
        chunk = chunk[:15000]
    output_file = os.path.join(output_folder, f'chunk_{i}.wav')
    chunk.export(output_file, format='wav')

```

마지막으로 무음제거 코드입니다.

```
for filename in os.listdir(output_folder):
    if filename.endswith('.wav'):
        input_path = os.path.join(output_folder, filename)
        output_path = os.path.join(output_folder, f'processed_{filename}')
        subprocess.call(['ffmpeg', '-i', input_path, '-af', 'silenceremove=1:0:-50dB', '-y', output_path])
        os.remove(input_path)
```

# 전체코드

```
from pydub import AudioSegment
from pydub.silence import split_on_silence
import os
import subprocess

# 음성파일 경로 설정
input_file = 'input_file.mp3'
output_folder = 'output_folder'

# 오디오 파일 로드 및 변환
sound = AudioSegment.from_file(input_file)
sound = sound.set_frame_rate(44100).set_channels(1).set_sample_width(2)

# 무음 구간을 기준으로 오디오 파일 분리
audio_chunks = split_on_silence(sound,
    min_silence_len=1000, # 최소 무음 길이 (밀리초 단위)
    silence_thresh=-35, # 무음으로 간주되는 dBFS 값
    keep_silence=500 # 분리된 오디오 조각들 간의 추가적인 무음 길이 (밀리초 단위)
)

# 출력 파일명 설정 및 출력 폴더 생성
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# 분리된 오디오 조각들 중 최대 15초까지만 선택하여 wav 파일로 저장
for i, chunk in enumerate(audio_chunks):
    if len(chunk) > 15000:
        chunk = chunk[:15000]
    output_file = os.path.join(output_folder, f'chunk_{i}.wav')
    chunk.export(output_file, format='wav')

# 무음 제거
for filename in os.listdir(output_folder):
    if filename.endswith('.wav'):
        input_path = os.path.join(output_folder, filename)
        output_path = os.path.join(output_folder, f'processed_{filename}')
        subprocess.call(['ffmpeg', '-i', input_path, '-af', 'silenceremove=1:0:-50dB', '-y', output_path])
        os.remove(input_path)

```
